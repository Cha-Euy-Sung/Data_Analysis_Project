from django.db import models
from django.utils.translation import get_language, ugettext_lazy as _
import json
from django.forms.models import model_to_dict
from django.core import serializers

# Create your models here.

class Member(models.Model):
    customer_id = models.CharField(_('CUSTOMER ID'), max_length=30)
    customer_type = models.CharField(_('CUSTOMER TYPE'), max_length=20)
    birth_year = models.CharField(_('BIRTH YEAR'), max_length=50)
    birth_month = models.CharField(_('BIRTH MONTH'), max_length=50)
    age = models.CharField(_('AGE'), max_length=50)
    province = models.CharField(_(''), max_length=20)
    city = models.CharField(_('CITY'), max_length=20)
    district = models.CharField(_('DISTRICT'), max_length=20)
    gender = models.CharField(_('GENDER'), max_length=20)

    def sales(self):
        queryset = Sales.objects.filter(customer_id=self.customer_id)
        json_queryset = []
        for sale in queryset:
            queryset = json_queryset.append(model_to_dict(sale))
        print(json_queryset)
        print(json_queryset)
        return json.dumps(json_queryset, ensure_ascii=False)

class Sales(models.Model):
    customer_id = models.CharField(_('CUSTOMER ID'), max_length=30)
    sales_type = models.CharField(_('SALES TYPE'), max_length=20)
    contract_type = models.CharField(_('CONTRACT TYPE'), max_length=20)
    distribution_channel = models.CharField(_('DISTRIBUTION CHANNEL'), max_length=30)
    contract_date = models.CharField(_('CONTRACT DATE'), max_length=30)
    contract_period = models.CharField(_('CONTRACT PERIOD'), max_length=50)
    payment_type = models.CharField(_('PAYMENT TYPE'), max_length=20)
    product_family = models.CharField(_('PRODUCT FAMILY'), max_length=20)
    rental_cost = models.CharField(_('RENTAL COST'), max_length=50)
    contract_status = models.CharField(_('CONTRACT STATUS'), max_length=20)
    num_arrear = models.CharField(_('NUMBER OF ARREAR'), max_length=50)
    overdue = models.CharField(_('OVERDUE'), max_length=20)
    credit_rating = models.CharField(_('CREDIT RATING'), max_length=20)
    payment_bank = models.CharField(_('PAYMENT BANK'), max_length=20)
    canceled = models.CharField(_('CANCELED'), max_length=20)
    # cancel_probability = models.CharField(_('CANCEL PROBABILITY'), max_length=30)

    def age(self):
        member = Member.objects.get(customer_id=self.customer_id)
        return member.age