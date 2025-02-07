# NOTES

Data from the front-end:
Creating new availability: {
date: '2025-02-10T07:00:00.000Z',
timeSlots: [ '1:00 PM', '7:30 AM', '9:30 AM', '12:30 PM' ]
}

I have this pg functions

```sql
-- Create trigger to automatically update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_stylist_updated_at
    BEFORE UPDATE ON stylists
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
```

Crating a new stylist:
email: example@example.com
password: Admin12345
Fname: Example
Sname: Example
phone: 1231231234
