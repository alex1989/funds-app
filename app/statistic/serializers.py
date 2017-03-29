from rest_framework import serializers
from .models import Fund, CollectedData


class CollectedDataSerializer(serializers.ModelSerializer):

    class Meta:
        model = CollectedData
        fields = ('id', 'timestamp', 'value', 'name')


class FundSerializer(serializers.ModelSerializer):

    class Meta:
        model = Fund
        fields = ('id', 'name')