import getWikiResults from "../lib/getwikiresults"
import Item from "../components/Item"

type Props = {
    params: {
        searchName: string
    }
}

export async function generateWikidata(params: Props) {
	
	
	var searchTerm = '';
	try{
		searchTerm = params.params.searchName
	}catch(err){
		searchTerm = params;
	}
	
    const wikiData: Promise<SearchResult> = getWikiResults(searchTerm)
    const data = await wikiData
    //const displayTerm = searchTerm.replaceAll('%20', ' ')

    return data;

}

export default async function SearchResults(params: Props) {

    const data = await generateWikidata(params)
    const results: Result[] | undefined = data?.query?.pages

    const content = (
        <main className="bg-slate-200 mx-auto max-w-lg py-1 min-h-screen">
            {results
                ? Object.values(results).map(result => {
                    return <Item key={result.pageid} result={result} />
                })
                : <h2 className="p-2 text-xl">{`${params.searchName} Not Found`}</h2>
            }
        </main>
    )

    return content
}