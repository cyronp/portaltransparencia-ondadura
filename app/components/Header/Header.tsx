import OndaDuraIcon from "../Icon/OndaDuraIcon/OndeDuraIcon";
import Heading from "../ui/Heading/Heading";
import { Separator } from "../ui/Separator/Separator";
import Text from "../ui/Text/Text";

export default function Header() {
  return (
    <>
      <header className="w-full bg-white">
        <div className="container mx-auto flex flex-row gap-4 items-center justify-between p-4">
          <div className="flex flex-row gap-4 items-center">
            <OndaDuraIcon />
            <Separator orientation="vertical" />
            <Heading as="h1" className="text-lg lg:text-2xl font-semibold">
              Portal da Transparência
            </Heading>
          </div>
          <div>
            <Text as="a" href="https://www.ondadura.com.br/" target="__blank" className="text-md lg:text-xl underline font-semibold">
              Conheça Quem Somos
            </Text>
          </div>
        </div>
      </header>
    </>
  );
}
