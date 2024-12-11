from django.core.files.storage import Storage
from django.conf import settings
from appwrite.client import Client
from appwrite.services.storage import Storage as AppwriteStorage
from appwrite.input_file import InputFile
from django.core.files.base import ContentFile

class AppwriteMediaStorage(Storage):
    def __init__(self, *args, **kwargs):
        self.client = Client()
        self.client.set_endpoint(settings.APPWRITE_ENDPOINT)
        self.client.set_project(settings.APPWRITE_PROJECT_ID)
        self.client.set_key(settings.APPWRITE_API_KEY)
        self.storage = AppwriteStorage(self.client)

    def _save(self, name, content):
        input_file = InputFile.from_bytes(content.read(), name)
        result = self.storage.create_file(
            bucket_id=settings.APPWRITE_BUCKET_ID,
            file_id='unique()',
            file=input_file
        )
        return result['$id']

    def _open(self, name, mode='rb'):
        result = self.storage.get_file_download(
            bucket_id=settings.APPWRITE_BUCKET_ID,
            file_id=name
        )
        return ContentFile(result)

    def exists(self, name):
        try:
            self.storage.get_file(
                bucket_id=settings.APPWRITE_BUCKET_ID,
                file_id=name
            )
            return True
        except:
            return False
    
    def delete(self, name):
        try:
            self.storage.delete_file(
                bucket_id=settings.APPWRITE_BUCKET_ID,
                file_id=name
            )
        except Exception as e:
            raise e

    def url(self, name):
        return f"{settings.APPWRITE_ENDPOINT}/storage/buckets/{settings.APPWRITE_BUCKET_ID}/files/{name}/view?project={settings.APPWRITE_PROJECT_ID}"