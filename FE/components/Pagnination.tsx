import { Button } from './ui/button';

interface IPagination {
  page: number;
  limit: any;
  total: any;
  setPage: (page: number) => void;
}

const Pagination: React.FC<IPagination> = ({ page, limit, total, setPage }) => {
  const totalPages = total && limit ? Math.ceil(parseInt(total) / parseInt(limit)) : 0;
  
  const onClick = (newPage: number) => {
    setPage(newPage);
  };

  const renderPagination = () => {
    const pages = [];
    
    pages.push(
      <Button key={1} onClick={() => onClick(1)} className={page === 1 ? 'bg-white text-black border' : ''} style={{ margin: '0 5px' }}>
        {1}
      </Button>
    );

    if (totalPages > 4 && page > 4) {
      pages.push(
        <Button key="start" className="disabled">
          ...
        </Button>
      );
    }

    for (let i = Math.max(page - 1, 2); i <= Math.min(page + 1, totalPages - 1); i++) {
      pages.push(
        <Button key={i} onClick={() => onClick(i)} className={page === i ? 'bg-white text-black border' : ''} style={{ margin: '0 5px' }}>
          {i}
        </Button>
      );
    }

    if (totalPages > 4 && page < totalPages - 3) {
      pages.push(
        <Button key="end" className="disabled" style={{ margin: '0 5px' }}>
          ...
        </Button>
      );
    }

    pages.push(
      <Button key={totalPages} onClick={() => onClick(totalPages)} className={page === totalPages ? 'bg-white text-black border' : ''}>
        {totalPages}
      </Button>
    );

    return pages;
  };

  return (
    <div>
      {renderPagination()}
    </div>
  );
};

export default Pagination;
