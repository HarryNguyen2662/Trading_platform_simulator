from django.urls import path, include
from knox import views as knox_views
from .views import RegisterAPI, LoginAPI, UserAPI, ChangePasswordAPI
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework import routers
from .views import PortfolioViewSet, FundsViewSet

router1 = routers.DefaultRouter()
router1.register('api/portfolio', PortfolioViewSet, 'portfolio')

urlpatterns1 = router1.urls

router2 = routers.DefaultRouter()
router2.register('api/funds', FundsViewSet, 'funds')

urlpatterns2 = router2.urls

urlpatterns = [
    path('api/auth', include('knox.urls')),
    path('api/auth/register', RegisterAPI.as_view()),
    path('api/auth/login', LoginAPI.as_view()),
    path('api/auth/user', UserAPI.as_view()),
    path('api/auth/user/password/change', ChangePasswordAPI.as_view()),
    path('api/auth/logout', knox_views.LogoutView.as_view(), name="knox_logout"),
    path('', include(urlpatterns1)), 
    path('', include(urlpatterns2)),
]

#urlpatterns = [
#    path('register/', views.register, name='register'),
#    path('balance/', views.balance, name='balance'),
#]