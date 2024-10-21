# Generated by Django 5.1.2 on 2024-10-18 06:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0006_alter_order_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='cart_items',
            field=models.ManyToManyField(to='store.cartitem'),
        ),
        migrations.AlterField(
            model_name='order',
            name='total_price',
            field=models.DecimalField(decimal_places=2, max_digits=10),
        ),
    ]
