export const getEmployees = async () => {
  try {
    const response = await fetch(`http://localhost:3005/employees/`, {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error('Failed to retrieve employee info');
    }
    return response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};
