import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 40px 20px;
`;

export const Title = styled.h1`
  font-size: 48px;
  color: #3a3a3a;
`;

export const TableContainer = styled.section`
  table {
    width: 100%;
    border-spacing: 0 8px;
    
		thead {
			th {
				color: #969cb3;
				font-weight: normal;
				padding: 20px 32px;
				text-align: left;
				font-size: 16px;
				line-height: 24px;
			}
		}

    tbody {
			tr {
				&:hover {
					transform: translate(10px);
				}
				td {
					padding: 20px 32px;
					border: 0;
					background: #45414f;
					font-size: 16px;
					font-weight: normal;
					color: #969cb3;

					&.title {
						color: #969cb3;
					}
					&.income {
						color: #12a454;
					}
					&.outcome {
						color: #e83f5b;
					}
				}
				td:first-child {
					border-radius: 8px 0 0 8px;
				}
				td:last-child {
					border-radius: 0 8px 8px 0;
				}
			}
    }
  }
`;