from django.urls import path
from .views import MainView, ResultsView

app_name = "museum"

urlpatterns = [
    path('', MainView.as_view()),
    path('results/', ResultsView.as_view()),
]