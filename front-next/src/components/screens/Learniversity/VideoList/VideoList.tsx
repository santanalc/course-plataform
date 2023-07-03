import React from "react";
import VideoCard from "./VideoCard/VideoCard";
import * as SC from "./VideoListStyledComponents";

type VideoListProps = {
  title: string;
};

export default function VideoList({ title }: VideoListProps) {
  return (
    <SC.Container>
      <h1 className="video-list-title">{title}</h1>
      <SC.VideoListWrapper>
        <VideoCard
          videoName="Fight Club"
          videoDescription="A depressed man suffering from insomnia meets a strange salesman named Tyler Durden and finds himself living in a dirty house after his perfect apartment is destroyed. The pair form a club with strict rules where men fight. Their perfect partnership is compromised when a woman, Marla, attracts Tyler's attention."
        />
        <VideoCard
          videoName="Rayman"
          videoDescription="Rayman is a series of electronic platform games created by Michel Ancel and owned by Ubisoft. The original Rayman is a platformer similar to others from the 32-bit era."
        />
        <VideoCard
          videoName="Fight Club"
          videoDescription="A depressed man suffering from insomnia meets a strange salesman named Tyler Durden and finds himself living in a dirty house after his perfect apartment is destroyed. The pair form a club with strict rules where men fight. Their perfect partnership is compromised when a woman, Marla, attracts Tyler's attention."
        />
        <VideoCard
          videoName="Rayman"
          videoDescription="Rayman is a series of electronic platform games created by Michel Ancel and owned by Ubisoft. The original Rayman is a platformer similar to others from the 32-bit era."
        />
        <VideoCard
          videoName="Fight Club"
          videoDescription="A depressed man suffering from insomnia meets a strange salesman named Tyler Durden and finds himself living in a dirty house after his perfect apartment is destroyed. The pair form a club with strict rules where men fight. Their perfect partnership is compromised when a woman, Marla, attracts Tyler's attention."
        />
        <VideoCard
          videoName="Fight Club"
          videoDescription="A depressed man suffering from insomnia meets a strange salesman named Tyler Durden and finds himself living in a dirty house after his perfect apartment is destroyed. The pair form a club with strict rules where men fight. Their perfect partnership is compromised when a woman, Marla, attracts Tyler's attention."
        />
        <VideoCard
          videoName="Rayman"
          videoDescription="Rayman is a series of electronic platform games created by Michel Ancel and owned by Ubisoft. The original Rayman is a platformer similar to others from the 32-bit era."
        />
        <VideoCard
          videoName="Fight Club"
          videoDescription="A depressed man suffering from insomnia meets a strange salesman named Tyler Durden and finds himself living in a dirty house after his perfect apartment is destroyed. The pair form a club with strict rules where men fight. Their perfect partnership is compromised when a woman, Marla, attracts Tyler's attention."
        />
        <VideoCard
          videoName="Fight Club"
          videoDescription="A depressed man suffering from insomnia meets a strange salesman named Tyler Durden and finds himself living in a dirty house after his perfect apartment is destroyed. The pair form a club with strict rules where men fight. Their perfect partnership is compromised when a woman, Marla, attracts Tyler's attention."
        />
        <VideoCard
          videoName="Rayman"
          videoDescription="Rayman is a series of electronic platform games created by Michel Ancel and owned by Ubisoft. The original Rayman is a platformer similar to others from the 32-bit era."
        />
        <VideoCard
          videoName="Fight Club"
          videoDescription="A depressed man suffering from insomnia meets a strange salesman named Tyler Durden and finds himself living in a dirty house after his perfect apartment is destroyed. The pair form a club with strict rules where men fight. Their perfect partnership is compromised when a woman, Marla, attracts Tyler's attention."
        />
      </SC.VideoListWrapper>
    </SC.Container>
  );
}
