from email.policy import default

from django.db import models


class Vote(models.Model):
    design = models.BooleanField()
    advantages = models.JSONField(default=dict)
