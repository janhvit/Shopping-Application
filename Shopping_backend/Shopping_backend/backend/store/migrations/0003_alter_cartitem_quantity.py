# Generated by Django 5.1.2 on 2024-10-10 12:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0002_remove_review_product_remove_review_user_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cartitem',
            name='quantity',
            field=models.PositiveIntegerField(),
        ),
    ]
