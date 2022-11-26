import os
from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from .forms import RegistrationForm
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import login
from .models import MovieList, Movie
from django.contrib.auth.models import User

api_key = os.environ.get('OMDb_API_KEY')

@login_required(login_url='/login')
def index(request):
    if request.method == 'POST':
        user = request.user
        title = request.POST['title']
        visibility = request.POST.getlist('visibility')

        if not visibility:
            MovieList.objects.create(user=user, name=title)
        else:
            MovieList.objects.create(user=user, name=title, private=True)

    user = request.user
    lists = MovieList.objects.filter(user=user)

    return render(request, 'movies/index.html', {
        'lists': lists
    })


def register(request):
    if request.method == 'POST':
        form = RegistrationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('index')
    else:
        form = RegistrationForm()

    return render(request, 'registration/register.html', {
        "form": form
    })


def list(request, name):
    movieList = Movie.objects.filter(movieList__name=name, movieList__user=request.user.id)
    lst = []
    for movie in movieList:
        lst.append(movie.imdb_id)
    count = len(lst)
    return render(request, 'movies/list.html', {
        "movieList": movieList,
        "lst": lst,
        "name": name,
        "count": count
    })


def playlist(request):
    if request.method == 'POST':
        imdb_id = request.POST['imdb_id']

        user = request.user.id
        lists = MovieList.objects.filter(user=user)

        return render(request, 'movies/playlist.html', {
            'lists': lists,
            'imdb_id': imdb_id,
        })
    return redirect('index')


def update(request):
    if request.method == 'POST':
        imdb_id = request.POST['imdb_id']
        playlist_ids = request.POST.getlist('playlists')

        playlist = Movie(imdb_id=imdb_id)
        playlist.save()

        for id in playlist_ids:
            id = MovieList.objects.get(id=id)
            playlist.movieList.add(id)

    return redirect('index')


def profile(request, user_name):
    try:
        user = User.objects.get(username=user_name)
        playlists = MovieList.objects.filter(user=user.id, private=False)
        count = len(playlists)
        return render(request, 'movies/profile.html', {
            'playlists': playlists,
            'user': user,
            'count': count
        })
    except User.DoesNotExist:
        return render(request, 'movies/error.html')


def public(request, playlist_id):
    playlist = MovieList.objects.get(id=playlist_id)
    movieList = Movie.objects.filter(movieList__id=playlist_id)
    lst = []
    for movie in movieList:
        lst.append(movie.imdb_id)
    count = len(lst)
    return render(request, 'movies/public.html', {
        "movieList": movieList,
        "lst": lst,
        "count": count,
        "playlist": playlist
    })
