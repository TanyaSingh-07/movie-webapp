# Generated by Django 4.0.3 on 2022-04-01 04:50

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('movies', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='movielist',
            name='movie',
        ),
        migrations.RemoveField(
            model_name='profile',
            name='movieList',
        ),
        migrations.RemoveField(
            model_name='profile',
            name='user',
        ),
        migrations.DeleteModel(
            name='Movie',
        ),
        migrations.DeleteModel(
            name='MovieList',
        ),
        migrations.DeleteModel(
            name='Profile',
        ),
    ]
