import styled from "styled-components";

export const TileContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease;
  width: 350px;
  height: 650px;
  margin-bottom: 20px;
`;

export const PosterImage = styled.img`
  border-radius: 10px 10px 0 0;
  height: 200px;
  object-fit: cover;
  width: 100%;
`;

export const ContentContainer = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const MovieTitle = styled.h2`
  font-size: 1.6rem;
  margin-bottom: 10px;
`;

export const Overview = styled.p`
  font-size: 1.4rem;
  line-height: 1.6;
  margin-bottom: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
`;

export const ReleaseDate = styled.p`
  font-size: 1.2rem;
  color: #888;
`;

export const ReadMoreLink = styled.a`
  color: #007bff;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s ease;

  &:hover {
    color: #0056b3;
  }
`;
