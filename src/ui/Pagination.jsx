import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.active ? ' var(--color-brand-600)' : 'var(--color-grey-50)'};
  color: ${(props) => (props.active ? ' var(--color-brand-50)' : 'inherit')};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

const PAGE_SIZE = 10;
const DEFAULT_PAGE = 1;

function Pagination({ count }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || DEFAULT_PAGE;

  const pageCount = Math.ceil(count / PAGE_SIZE);
  const fromCount = (currentPage - 1) * PAGE_SIZE + 1;
  const toCount = Math.min(currentPage * PAGE_SIZE, count);

  function handleNextPage() {
    const nextPage = Math.min(currentPage + 1, pageCount);
    updatePageParam(nextPage);
  }

  function handlePreviousPage() {
    const previousPage = Math.max(currentPage - 1, 1);
    updatePageParam(previousPage);
  }

  function updatePageParam(page) {
    searchParams.set('page', page);
    setSearchParams(searchParams);
  }

  if (pageCount <= 1) return null;

  return (
    <StyledPagination>
      <P>
        Showing <span>{fromCount}</span> to <span>{toCount}</span> of{' '}
        <span>{count}</span> results
      </P>

      <Buttons>
        <PaginationButton
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          <HiChevronLeft />
          <span>Previous</span>
        </PaginationButton>
        <PaginationButton
          onClick={handleNextPage}
          disabled={currentPage === pageCount}
        >
          <span>Next</span>
          <HiChevronRight />
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  );
}

export default Pagination;
