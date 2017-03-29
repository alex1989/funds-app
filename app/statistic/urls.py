from django.conf.urls import url, include
from .views import FundListView, CollectedDataListView, IndexView


api_patterns = [
    url(r'^funds/?$', FundListView.as_view(), name='funds'),
    url(r'^funds/(?P<fund_id>\d+)/?$', CollectedDataListView.as_view(), name='fund-collected-data'),
]


urlpatterns = [
    url(r'^api/v1/', include(api_patterns)),
    url(r'^', IndexView.as_view(), name='index-view')
]
