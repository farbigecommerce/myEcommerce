# Generated by Django 4.2.4 on 2024-03-13 09:41

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='customusermodel',
            options={'verbose_name': 'User', 'verbose_name_plural': 'Users'},
        ),
    ]
