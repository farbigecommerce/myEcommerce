# Generated by Django 4.2.4 on 2024-03-15 15:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_alter_customusermodel_options'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customusermodel',
            name='last_name',
            field=models.CharField(max_length=100, verbose_name='Last Name'),
        ),
    ]
