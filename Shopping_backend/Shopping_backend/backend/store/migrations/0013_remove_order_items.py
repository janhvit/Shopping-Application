# Generated by Django 5.1.2 on 2024-10-21 04:18

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0012_order_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='order',
            name='items',
        ),
    ]
