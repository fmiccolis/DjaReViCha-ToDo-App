from django.contrib.auth.models import AbstractUser
from django.db import models
from django_extensions.db.models import TimeStampedModel
from django.utils.translation import gettext, gettext_lazy as _


# Create your models here.
class User(TimeStampedModel, AbstractUser):
    profile_pic = models.ImageField(
        verbose_name=_('profile pic'),
        upload_to='profile_pics',
        null=True,
        blank=True,
        help_text=_('Not required. The photo will be stored in the system')
    )
    birth_date = models.DateField(
        verbose_name=_('birth date'),
        null=True,
        blank=True,
        help_text=_('Not required. The birth date of the user')
    )

    class Meta:
        db_table = 'user'
        verbose_name = 'user'
        verbose_name_plural = _('users')

    def nominativo(self):
        return f"{self.first_name} {self.last_name}"

    nominativo.short_description = _('full name')

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class ToDo(TimeStampedModel):
    title = models.CharField(
        verbose_name=_('title'),
        max_length=100,
        help_text=_('A title for the thing to do')
    )
    description = models.TextField(
        verbose_name=_('content'),
        help_text=_('The description of the thing to do')
    )
    due_date = models.DateField(
        verbose_name=_('due date'),
        null=True,
        blank=True,
        help_text=_('The date by which the thing should be done')
    )
    done_date = models.DateField(
        verbose_name=_('done date'),
        null=True,
        blank=True,
        help_text=_('The date on which the thing was done')
    )
    owner = models.ForeignKey(
        User,
        verbose_name=_('owner'),
        help_text=_('Who have to do the thing'),
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )

    class Meta:
        db_table = 'todo'
        verbose_name = 'todo'
        verbose_name_plural = _('todos')

    def __str__(self):
        return f"{self.title} {self.due_date.strftime('%d %B %Y')}"
