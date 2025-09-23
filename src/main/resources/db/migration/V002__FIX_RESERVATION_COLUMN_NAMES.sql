
ALTER TABLE reservations RENAME COLUMN expiration_datetime TO expiration_date_time;

ALTER TABLE reservations RENAME COLUMN reservation_datetime TO reservation_date_time;

ALTER TABLE reservations RENAME COLUMN used_datetime TO used_date_time;
