from django.urls import re_path, path, include
from rest_framework import routers

from accounts.viewsets import ProfileViewSet, FileUploadView


router = routers.DefaultRouter()
router.register(
        r'',
        ProfileViewSet,
        basename='profiles'
    )


urlpatterns = [
    re_path(r'upload/(?P<filename>[^/]+)$', FileUploadView.as_view()),
    path('', include(router.urls)),
]

# .as_view({'get': 'list'})