# Generated by Django 5.1.2 on 2024-10-18 09:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0010_remove_order_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='status',
            field=models.CharField(default='cart', max_length=20),
        ),
    ]
