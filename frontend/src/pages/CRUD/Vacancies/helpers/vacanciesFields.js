const vacanciesFields = {
  id: { type: 'id', label: 'ID' },

  title: { type: 'string', label: 'Title' },

  link: { type: 'string', label: 'Link' },

  company: { type: 'string', label: 'Company ' },

  date_application: { type: 'datetime', label: 'Date App' },

  interest: { type: 'int', label: 'Interest' },

  notes: { type: 'string', label: 'Notes' },

  salary_from: { type: 'string', label: 'Salary From' },

  salary_to: { type: 'string', label: 'Salary to' },

  user_id: { type: 'relation_one', label: 'User' },
};

export default vacanciesFields;
