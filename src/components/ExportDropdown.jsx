import { exportTodos } from '../api/todo';
import { Dropdown } from 'react-bootstrap';

export default function ExportDropdown() {
  const handleExport = async (format) => {
    try {
      const res = await exportTodos(format);

      const blob = new Blob([res.data], { type: res.headers['content-type'] });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `todos.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      alert('Failed to export todos');
    }
  };

  return (
      <Dropdown>
        <Dropdown.Toggle variant="primary" id="export-dropdown">
          Export Data
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => handleExport('txt')}>Plain Text</Dropdown.Item>
          <Dropdown.Item onClick={() => handleExport('csv')}>CSV</Dropdown.Item>
          <Dropdown.Item onClick={() => handleExport('sql')}>SQL</Dropdown.Item>
          <Dropdown.Item onClick={() => handleExport('json')}>JSON</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
  );
}
