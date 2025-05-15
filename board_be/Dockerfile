FROM python:3

WORKDIR /srv/board_be
COPY ./ /srv/board_be
RUN pip install -r requirements.txt

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]