import uuid
import time

from django.db import models


class Fund(models.Model):
    #id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField('name', max_length=250)

    class Meta:
        verbose_name = 'fund'
        verbose_name_plural = 'funds'

    def __str__(self):
        return self.name
    

class CollectedData(models.Model):
    fund = models.ForeignKey(Fund, verbose_name='statistic data')
    date = models.DateField('date')
    value = models.DecimalField('value', max_digits=16, decimal_places=7)

    class Meta:
        verbose_name = 'collected data'
        verbose_name_plural = 'сollected data'

    @property
    def timestamp(self):
        return int(time.mktime(self.date.timetuple())*1000)

    @property
    def name(self):
        return self.fund.name