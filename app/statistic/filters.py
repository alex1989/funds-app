from .models import CollectedData
import django_filters

class FundFilter(django_filters.FilterSet):

    class Meta:
        model = CollectedData
        fields = ['fund']