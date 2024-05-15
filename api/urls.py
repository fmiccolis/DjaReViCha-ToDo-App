from django.urls import path, include

from api.views.todo import *

urlpatterns = [
    # model todo
    path('todo/', include([
        path('all', ListToDoAPIView.as_view()),
        path('create', CreateToDoAPIView.as_view()),
        path('get-by-owner/<int:owner>', GetToDoByOwner.as_view()),
        path('<int:pk>/', include([
            path('', GetToDoAPIView.as_view()),
            path('update', UpdateToDoAPIView.as_view()),
            path('delete', DeleteToDoAPIView.as_view()),
        ]))
    ])),
]
