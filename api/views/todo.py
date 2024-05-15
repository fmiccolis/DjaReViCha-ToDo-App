from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView
from rest_framework.permissions import IsAuthenticated

from api.models import ToDo
from api.serializers.todo import AllToDoSerializer


# Create your views here.
class ListToDoAPIView(ListAPIView):
    queryset = ToDo.objects.all()
    serializer_class = AllToDoSerializer


class GetToDoAPIView(RetrieveAPIView):
    queryset = ToDo.objects.all()
    serializer_class = AllToDoSerializer


class CreateToDoAPIView(CreateAPIView):
    queryset = ToDo.objects.all()
    serializer_class = AllToDoSerializer
    permission_classes = (IsAuthenticated, )


class UpdateToDoAPIView(UpdateAPIView):
    queryset = ToDo.objects.all()
    serializer_class = AllToDoSerializer
    permission_classes = (IsAuthenticated, )


class DeleteToDoAPIView(DestroyAPIView):
    queryset = ToDo.objects.all()
    serializer_class = AllToDoSerializer
    permission_classes = (IsAuthenticated, )


class GetToDoByOwner(ListAPIView):
    serializer_class = AllToDoSerializer
    lookup_field = 'owner'

    def get_queryset(self):
        return ToDo.objects.filter(**self.kwargs)
