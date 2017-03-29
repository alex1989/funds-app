from django.core.management.base import BaseCommand
from django.db import transaction
from ...models import Fund, CollectedData
from decimal import InvalidOperation
import csv


class Command(BaseCommand):

    def add_arguments(self, parser):
        parser.add_argument('file', default=False, help='specify import file')

    def get_or_create_fund(self, fund_name):
        return Fund.objects.get_or_create(name=fund_name)[0]

    @transaction.atomic
    def handle(self, *args, **options):
        file = options['file']
        try:
            names = []
            with open(file, newline='') as csvfile:
                reader = csv.DictReader(csvfile)
                for row in reader:
                    names = names or\
                            [name for name in row.keys() if name != 'Date']
                    for fund_name in names:
                        fund = self.get_or_create_fund(fund_name)
                        
                        try:
                            if row[fund_name]:
                                CollectedData.objects.create(fund=fund,
                                                             value=row[fund_name],
                                                             date=row['Date'])
                        except InvalidOperation as e:
                            print(fund_name, row['Date'], row[fund_name])
                            raise e
            self.stdout.write(self.style.SUCCESS('[{funds}] were imported'.format(funds=', '.join(names))))

        except FileNotFoundError:
            self.stdout.write(self.style.ERROR(('{} not found').format(file)))
