from django.apps import apps
import csv
from itertools import islice
from sales.models import Sales, Member

def bulk_insert(model, filename):
    model_name = apps.get_model('sales', model)
    data_reader = csv.reader(open(filename), delimiter=',', quotechar='"')
    columns = next(data_reader)
    batch_size = 30

    while True:
        # batch = [model_name(dict(zip(columns, row)))
        # batch = [print(dict(zip(columns, row))) for row in islice(data_reader, batch_size)]
        batch = [model_name(**dict(zip(columns, row))) for row in islice(data_reader, batch_size)]
        if not batch:
            break
        # print(batch)
        # print(batch[0])
        # break
        model_name.objects.bulk_create(batch, batch_size)