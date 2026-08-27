from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
import json

@csrf_exempt
def login_user(request):
    data = json.loads(request.body)
    username = data['userName']
    password = data['password']
    user = authenticate(username=username, password=password)
    response_data = {"userName": username}
    if user is not None:
        login(request, user)
        response_data["status"] = "Authenticated"
    else:
        response_data["status"] = "Failed"
    return JsonResponse(response_data)

@csrf_exempt
def logout_request(request):
    username = ""
    if request.user.is_authenticated:
        username = request.user.username
    logout(request)
    return JsonResponse({"userName": ""})

@csrf_exempt
def registration(request):
    data = json.loads(request.body)
    username = data['userName']
    password = data['password']
    first_name = data['firstName']
    last_name = data['lastName']
    email = data['email']

    if User.objects.filter(username=username).exists():
        return JsonResponse({"userName": username, "error": "Already Registered"})

    user = User.objects.create_user(
        username=username, first_name=first_name, last_name=last_name,
        email=email, password=password
    )
    login(request, user)
    return JsonResponse({"userName": username, "status": "Authenticated"})