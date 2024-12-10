import logging
from django.http import JsonResponse

logger = logging.getLogger('django')

def rooms_view(request):
    try:
        if request.method == 'POST':
            logger.debug('POST request received at /api/rooms/')
            # Your view logic here
            logger.debug('Rooms view logic executed successfully')
            # Example response
            return JsonResponse({'message': 'Rooms data'})
        else:
            logger.warning(f'Unexpected request method: {request.method}')
            return JsonResponse({'error': 'Method not allowed'}, status=405)
    except Exception as e:
        logger.error(f'Error occurred in rooms_view: {e}', exc_info=True)
        return JsonResponse({'error': 'Internal Server Error'}, status=500)