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
def get_cars(request):
    car_models = [
        {"CarMake": "Toyota", "CarModel": "Camry"},
        {"CarMake": "Toyota", "CarModel": "Corolla"},
        {"CarMake": "Honda", "CarModel": "Civic"},
        {"CarMake": "Honda", "CarModel": "Accord"},
        {"CarMake": "Ford", "CarModel": "Focus"},
        {"CarMake": "Ford", "CarModel": "Fusion"},
        {"CarMake": "BMW", "CarModel": "3 Series"},
        {"CarMake": "BMW", "CarModel": "5 Series"},
        {"CarMake": "Mercedes", "CarModel": "C-Class"},
        {"CarMake": "Mercedes", "CarModel": "E-Class"},
        {"CarMake": "Audi", "CarModel": "A4"},
        {"CarMake": "Audi", "CarModel": "A6"},
        {"CarMake": "Chevrolet", "CarModel": "Malibu"},
        {"CarMake": "Nissan", "CarModel": "Altima"},
        {"CarMake": "Hyundai", "CarModel": "Sonata"},
    ]
    return JsonResponse({"CarModels": car_models}) 

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