# corona-stats

Web Crawler for gathering data from different websites to see Coronavirus affect on them.

The idea is to save data into DynamoDB and serve them as graphs with S3 static website. The goal is to fit into AWS free
tier limit and of course integrate will all of the services.

Working integrations:

- empty

In progress:

- https://zaspawita.pl/e1/plany-mieszkan

Todo:

- http://www.bmc.gda.pl/oro/lista-mieszkan
- https://prod.ceidg.gov.pl/ceidg.cms.engine/?D;bbd09402-098c-43a5-a8bf-e260b22f283b
- https://moderntower.pl/lokale/
- https://www.gdansk.robyg.pl/oferta/mieszkania/zajezdnia-wrzeszcz
- https://zaspawita.pl/e1/plany-mieszkan/
- https://www.hossa.gda.pl/centralpark/tabela-mieszkan/s/26
- https://przystanekmorena.pl/mieszkania/#mieszkania
- https://www.alvarium.pl/wyszukiwarka?pokoi=&strony=&metrazod=41.57&metrazdo=316.44&dataodbioru=&pietrood=-1&pietrodo=8&typlokalu1=on&strona=4#table
- https://www.gdansk.robyg.pl/oferta/mieszkania/zielony-widok

### Library

We are using headless Chromium with AWS Lambda. It's possible due to this package https://github.com/alixaxel/chrome-aws-lambda
