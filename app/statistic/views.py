from django.views.generic import TemplateView
from django_filters import rest_framework as filters
from rest_framework import generics

from .models import Fund, CollectedData
from .serializers import FundSerializer, CollectedDataSerializer
from .filters import FundFilter


class FundListView(generics.ListAPIView):
    queryset = Fund.objects.all()
    serializer_class = FundSerializer
    


class CollectedDataListView(generics.ListAPIView):
    queryset = CollectedData.objects.all()
    serializer_class = CollectedDataSerializer
    #filter_backends = (filters.DjangoFilterBackend,)
    #filter_class = FundFilter

    def get_queryset(self, *args, **kwargs):
        return super(CollectedDataListView, self).get_queryset(*args, **kwargs).filter(
            fund__id=self.kwargs.get('fund_id', None))


class IndexView(TemplateView):
    template_name = 'index.html'
