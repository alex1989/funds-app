# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-03-29 02:45
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='CollectedData',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(verbose_name='date')),
                ('value', models.DecimalField(decimal_places=7, max_digits=12, verbose_name='value')),
            ],
            options={
                'verbose_name': 'collected data',
                'verbose_name_plural': 'сollected data',
            },
        ),
        migrations.CreateModel(
            name='Fund',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=250, verbose_name='name')),
            ],
            options={
                'verbose_name': 'fund',
                'verbose_name_plural': 'funds',
            },
        ),
        migrations.AddField(
            model_name='collecteddata',
            name='statistic_data',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='statistic.Fund', verbose_name='statistic data'),
        ),
    ]
