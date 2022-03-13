import { Card, Grid } from "@mantine/core";
import { PrismaClient, Recipe } from "@prisma/client";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import defaultImage from "public/default.jpg";
import { FC } from "react";
import { cloneDeep } from "utils/cloneDeep";

type Props = {
  allRecipes: Recipe[];
};

const IndexPage: FC<Props> = ({ allRecipes }) => (
  <Grid>
    {allRecipes.map((recipe) => (
      <Grid.Col key={recipe.id} span={6} md={4} lg={3}>
        <Link href={`/pea/${recipe.id}`} passHref>
          <Card
            component="a"
            className="shadow-md !shadow-black/25 hover:shadow-lg hover:scale-[1.01] transition motion-reduce:hover:transform-none"
          >
            <Card.Section className="h-48 relative">
              <Image
                alt=""
                layout="fill"
                objectFit="cover"
                sizes="(min-width: 1200px) 25vw, (min-width: 992px) 34vw, 50vw"
                src={recipe.image ? "/uploaded/" + recipe.image : defaultImage}
              />
            </Card.Section>
            <Card.Section>
              <div className="absolute bottom-0 bg-mt-dark-9 bg-opacity-70 p-3 text-mt-dark-0 w-full">
                <h4>{recipe.title}</h4>
              </div>
            </Card.Section>
          </Card>
        </Link>
      </Grid.Col>
    ))}
  </Grid>
);

const prisma = new PrismaClient();
export const getServerSideProps: GetServerSideProps = async () => {
  const allRecipes = await prisma.recipe.findMany();
  return {
    props: {
      allRecipes: cloneDeep(allRecipes),
    },
  };
};

export default IndexPage;
