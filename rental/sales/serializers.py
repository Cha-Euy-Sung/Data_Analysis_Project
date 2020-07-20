from .models import Member, Sales
from rest_framework import serializers

class MemberSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.IntegerField(read_only=True)
    all_sales = serializers.CharField(source='sales', read_only=True)
    class Meta:
        model = Member
        fields = '__all__'


class SalesSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.IntegerField(read_only=True)
    customer_age = serializers.CharField(source='age', read_only=True)
    class Meta:
        model = Sales
        fields = '__all__'