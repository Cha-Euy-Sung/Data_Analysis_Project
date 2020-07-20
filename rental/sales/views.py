from django.shortcuts import render
from rest_framework import viewsets
from .models import Member, Sales
from .serializers import MemberSerializer, SalesSerializer
from django_filters.rest_framework import DjangoFilterBackend
import joblib
import pandas as pd
from django.conf import settings
import os
from catboost import CatBoostClassifier, Pool
from django.http import HttpResponse

# Create your views here.
class MemberViewSet(viewsets.ModelViewSet):
    queryset = Member.objects.all()
    serializer_class = MemberSerializer
    # filter_backends = [DjangoFilterBackend]
    # filterset_fields = ['gender', 'birth_year']

    def get_queryset(self):
        queryset = Member.objects.all()
        genders = self.request.query_params.get('gender', '')
        provinces = self.request.query_params.get('province', '')
        customer_ids = self.request.query_params.get('customerId', '')
        print(genders, provinces)

        if genders:
            gender = genders.split(',')
            print(gender)
            queryset = queryset.filter(gender__in=gender)

        if provinces:
            province = provinces.split(',')
            queryset = queryset.filter(province__in=province)

        if customer_ids:
            # customer_id = customer_ids.split(',')
            customer_id = customer_ids
            print(customer_id)
            queryset = queryset.filter(customer_id__icontains=customer_id)
        return queryset

class SalesViewSet(viewsets.ModelViewSet):
    queryset = Sales.objects.all()
    serializer_class = SalesSerializer
    # filter_backends = [DjangoFilterBackend]
    # filterset_fields = ['category', 'in_stock']

    def get_queryset(self):
        queryset = Sales.objects.all()
        canceleds = self.request.query_params.get('canceled', '')
        customer_ids = self.request.query_params.get('customerId', '')
        print(canceleds)

        if canceleds:
            canceled = canceleds.split(',')
            print(canceled)
            queryset = queryset.filter(canceled__in=canceled)

        if customer_ids:
            # customer_id = customer_ids.split(',')
            customer_id = customer_ids
            print(customer_id)
            queryset = queryset.filter(customer_id__icontains=customer_id)

        return queryset


def predict_cancel(request):
    gender = request.GET.get('gender', '')
    contract_type = request.GET.get('contract_type', '')
    age = request.GET.get('age', '')
    sales_type = request.GET.get('sales_type', '')
    # credit_rating = request.GET.get('credit_rating', '')
    province = request.GET.get('province', '')
    payment_type = request.GET.get('payment_type', '')
    print(gender, contract_type, age)
    print(sales_type, province, payment_type)

    model = joblib.load(os.path.join(settings.BASE_DIR, 'predict_model_add_province.sav'))
    total_columns = [
        'age',
        'gender_남자',
        'gender_여자',
        'contract_type_교체렌탈',
        'contract_type_멤버십A',
        'contract_type_멤버십B',
        'contract_type_멤버십S',
        'contract_type_멥버십C',
        'contract_type_일반',
        'contract_type_통합 패키지',
        'contract_type_프로모션',
        'sales_type_렌탈',
        'sales_type_멤버십',
        'province_강원도',
        'province_경기도',
        'province_경상도',
        'province_서울특별시',
        'province_전라도',
        'province_제주도',
        'province_충청도',
        'payment_type_CMS',
        'payment_type_가상계좌',
        'payment_type_무통장',
        'payment_type_카드이체'
    ]
    df = pd.DataFrame({}, columns=total_columns)
    new = {
        'gender': gender,
        'contract_type': contract_type,
        'age': int(age),
        'sales_type': sales_type,
        'province': province,
        'payment_type': payment_type,
    }
    # new = {
    #     'gender': '남자',
    #     'contract_type': '일반',
    #     'age': 20,
    #     'sales_type': '렌탈',
    #     'credit_rating': 4,
    #     'payment_type': '카드이체',
    # }
    df_new = pd.DataFrame(new, index=[0])
    df_dummy = pd.get_dummies(df_new)
    new_dummy = pd.concat([df, df_dummy])
    new_dummy.fillna(0, inplace=True)
    pd.set_option('display.max_columns', 500)

    pred_proba = model.predict_proba(new_dummy)
    pred_proba_1 = pred_proba[:,1].reshape(-1,1) 

    return HttpResponse(round(pred_proba_1[0,0]*100, 2), status=200);