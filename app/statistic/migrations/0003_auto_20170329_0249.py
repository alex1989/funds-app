# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-03-29 02:49
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('statistic', '0002_auto_20170329_0246'),
    ]

    operations = [
        migrations.AlterField(
            model_name='collecteddata',
            name='value',
            field=models.DecimalField(decimal_places=7, max_digits=16, verbose_name='value'),
        ),
    ]
