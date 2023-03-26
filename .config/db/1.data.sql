USE taskify;

INSERT INTO todos (
  id,
  `subject`,
  `author`,
  `created`,
  `lastModified`,
  `state`,
  `description`
) VALUES (
  'd93e5537-f12e-456b-8e65-d70a7117edf8',
  'Groceries',
  'ec1de64a-45f6-4d70-9f66-4efd26650f3c',
  NOW(),
  NOW(),
  0,
  'Apples\n\Bananas\nBread\nPotatoes');