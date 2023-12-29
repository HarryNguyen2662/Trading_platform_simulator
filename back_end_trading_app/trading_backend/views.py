from django.shortcuts import render

from rest_framework import status
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, UpdateAPIView, RetrieveUpdateAPIView, GenericAPIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import generics, permissions, status

from .serializers import UserSerializer, PortfolioSerializer, RegisterSerializer, LoginSerializer, ChangePasswordSerializer, FundsSerializer
from django.contrib.auth.models import User
from knox.models import AuthToken

# Register API
class RegisterAPI(GenericAPIView):
    serializer_class = RegisterSerializer

    # emails, passwords etc will be sent from here
    def post(self, request, *args, **kwargs):
        # any data that comes in from request will be passed into serializer
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user,
                                   context=self.get_serializer_context()).data,
            "bearer": AuthToken.objects.create(user)[1]
        })


# Login API
class LoginAPI(GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "user": UserSerializer(user,
                                   context=self.get_serializer_context()).data,
            "bearer": AuthToken.objects.create(user)[1]
        })


# Get User API
class UserAPI(generics.RetrieveUpdateAPIView):
    # ensure token is available and correct before getting data
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


class ChangePasswordAPI(UpdateAPIView):
    """
    An endpoint for changing password.
    """
    permission_classes = (
        permissions.IsAuthenticated,
    )
    serializer_class = ChangePasswordSerializer
    model = User

    def get_object(self, queryset=None):
        return self.request.user

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            # Check old password
            old_password = serializer.data.get("old_password")
            if not self.object.check_password(old_password):
                return Response({"old_password": ["Wrong password."]}, status=status.HTTP_400_BAD_REQUEST)
            # set_password also hashes the password that the user will get
            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()
            return Response("Success.", status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PortfolioViewSet(ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    serializer_class = PortfolioSerializer

    # get data from the respective user
    def get_queryset(self):
        return self.request.user.portfolio.all()

    # allow saving of owner information
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class FundsViewSet(ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    serializer_class = FundsSerializer

    # get data from the respective user
    def get_queryset(self):
        return self.request.user.funds.all()

    # allow saving of owner information
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

############################################################################################################################################################################################################################

# Create your views here.
#@api_view(['POST', 'GET'])
#def register(request):
#    if request.method == 'POST':
#        user_serializer = UserSerializer(data=request.data)
#        if user_serializer.is_valid():
##            user = user_serializer.save()
 #           wallet_data = {'user': user.id, 'balance': 100.0}
 #           wallet_serializer = WalletSerializer(data=wallet_data)
 #           if wallet_serializer.is_valid():
 #               wallet_serializer.save()
 #               return Response(
 #                   {'user': user_serializer.data, 'wallet': wallet_serializer.data},
 #                   status=status.HTTP_201_CREATED
 #               )
 #           else:
 #               user.delete()
 #               return Response(wallet_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
 #       return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
 #   
 #   if request.method == 'GET':
 #       users = User.objects.all()
 #       serializer = UserSerializer(users, many=True)
 #       return Response(serializer.data)

#@api_view(['POST', 'GET'])
#def balance(request):
#    if request.method == 'POST':
#        user = request.data.get('user')
#        amount = request.data.get('amount')
#        if User.objects.filter(id=user).exists():
#            print(123123)
#            wallet = Wallet.objects.get(user=user)
#            wallet.balance += amount
#            wallet.save()
#            return Response("Update successfuly", status=status.HTTP_201_CREATED)
#        else:
#            return Response("Does not exit user", status=status.HTTP_400_BAD_REQUEST)
#
#    if request.method == 'GET':
#        wallets = Wallet.objects.all()
#        serializer = WalletSerializer(wallets, many=True)
#        return Response(serializer.data)
    
    
###
{
    "amount": 85.45,
    "user": 15
}
###