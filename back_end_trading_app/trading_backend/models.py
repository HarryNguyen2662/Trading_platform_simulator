from django.db import models
from datetime import datetime
from django.contrib.auth.models import User

# Create your models here.
#class User(models.Model):
#    username = models.CharField(max_length=30, null=False, blank=False, default='', unique=True)
#    password = models.CharField(max_length=30, null=False, blank=False, default='')
#    def __str__(self):
#        return self.username

class Funds(models.Model):
    transactionType = models.CharField(null=True, max_length=20)
    amount = models.FloatField(null=True)
    totalFund = models.FloatField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey(
        User, related_name="funds", on_delete=models.CASCADE, null=True)

    # prevents adding of "s" default
    class Meta:
        verbose_name_plural = "funds"


class Portfolio(models.Model):
    symbol = models.CharField(max_length=10)
    company = models.CharField(max_length=100)
    transaction = models.CharField(max_length=20)
    quantity = models.IntegerField()
    price = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey(
        User, related_name="portfolio", on_delete=models.CASCADE, null=True)
    
    
############################################################################################################################################################################################################################

#class Wallet(models.Model):
#    user = models.ForeignKey(User, on_delete=models.CASCADE)
#    balance = models.FloatField(default=0)
#    def __str__(self):
#        return self.balance

#class WalletTransactions(models.Model):
#    #id = models.AutoField(primary_key=True)
#    wallet = models.ForeignKey(Wallet, on_delete=models.CASCADE)
#    transaction_date = models.DateTimeField(auto_now_add=True)
#    transaction_type = models.CharField(max_length=60)
#    amount = models.FloatField()

#class Portfolio(models.Model):
#    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
#    symbol = models.CharField(max_length=60)
#    name = models.CharField(max_length=60, default='NONE')
#    quantity = models.IntegerField()
#    def __str__(self):
#        return self.balance


#class PortfolioTransactions(models.Model):
#    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
#    symbol = models.CharField(max_length=60)
#    name = models.CharField(max_length=60, default='NONE')
#    quantity = models.IntegerField()
#    unit_price = models.FloatField()
#    transaction_date = models.DateTimeField(auto_now_add=True)
#    transaction_type = models.CharField(max_length=60)
#    def __str__(self):
#        return self.balance