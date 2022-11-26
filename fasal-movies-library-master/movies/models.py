from django.db import models
from django.contrib.auth.models import User


class MovieList(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
    )
    name = models.CharField(max_length=20)
    private = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user}'s {self.name}"


class Movie(models.Model):
    imdb_id = models.CharField(max_length=20)
    movieList = models.ManyToManyField(MovieList)

    def __str__(self):
        id = [x.name for x in self.movieList.all()]
        return f"{self.imdb_id} - {id}"
