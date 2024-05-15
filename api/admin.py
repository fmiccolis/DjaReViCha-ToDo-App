from django.conf import settings
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.utils.safestring import mark_safe
from django.utils.translation import gettext, gettext_lazy as _
from rest_framework_simplejwt.token_blacklist.admin import OutstandingTokenAdmin
from rest_framework_simplejwt.token_blacklist.models import OutstandingToken

from api.models import User, ToDo


# Register your models here.

class CustomUserAdmin(UserAdmin):
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        (_('Personal info'), {'fields': (
            'first_name', 'last_name', 'email', 'profile_pic', 'profilepicimg')}),
        (_('Permissions'), {
            'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions'),
        }),
        (_('Important dates'), {'fields': ('last_login', 'date_joined')}),
    )
    list_display = ('username', 'email', 'propic')
    readonly_fields = ('profilepicimg',)

    def profilepicimg(self, user: User):
        if user.profile_pic:
            return mark_safe(f'<img style="width: 25%" src="{settings.MEDIA_URL}{user.profile_pic}" alt="fuck" />')
        return ""

    profilepicimg.short_description = "profile image"

    def propic(self, user: User):
        if user.profile_pic:
            return mark_safe(f'<a href="{settings.MEDIA_URL}{user.profile_pic}" target="_blank">vedi foto</a>')

    propic.short_description = "profile image"


class ToDoAdmin(admin.ModelAdmin):
    fieldsets = (
        (None, {'fields': ('title', 'due_date', 'owner')}),
        (_('Details'), {'fields': (
            'description', 'done_date')}),
    )
    list_display = ('title', 'due_date', 'owner', 'is_done')

    def is_done(self, instance: ToDo):
        return instance.done_date is not None


class CustomOutstandingTokenAdmin(OutstandingTokenAdmin):

    def has_delete_permission(self, *args, **kwargs):
        return True  # or whatever logic you want


admin.site.unregister(OutstandingToken)
admin.site.register(OutstandingToken, CustomOutstandingTokenAdmin)

admin.site.register(User, CustomUserAdmin)
admin.site.register(ToDo, ToDoAdmin)
