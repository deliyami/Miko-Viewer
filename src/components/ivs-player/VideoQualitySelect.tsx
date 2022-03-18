import { Button, Popover, PopoverBody, PopoverContent, PopoverTrigger } from "@chakra-ui/react";
import * as ivs from "amazon-ivs-player";
import { FC, MouseEventHandler, MutableRefObject } from "react";

const VideoQualitySelect: FC<{
  player: MutableRefObject<ivs.MediaPlayer>;
  selectableQuality: ivs.Quality[];
}> = ({ player, selectableQuality }) => {
  const setQuality: MouseEventHandler<HTMLDivElement> = event => {
    if (event.target instanceof HTMLDivElement) {
      const idx = parseInt(event.target.dataset.idx);
      console.log(idx);
      player.current.setQuality(selectableQuality[idx]);
    }
  };

  return (
    <Popover placement="top-end">
      <PopoverTrigger>
        <Button>quality</Button>
      </PopoverTrigger>
      <PopoverContent>
        {/* <PopoverArrow /> */}
        {/* <PopoverCloseButton /> */}
        {/* <PopoverHeader>Confirmation!</PopoverHeader> */}
        <PopoverBody onClick={setQuality}>
          {selectableQuality.map((obj, i) => (
            <div key={obj.name} data-idx={`${i}`}>
              {obj.name}
            </div>
          ))}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default VideoQualitySelect;
