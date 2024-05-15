from rest_framework import serializers

from api.models import ToDo


class AllToDoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ToDo
        fields = "__all__"
