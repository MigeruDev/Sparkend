# import necessary libraries
from pyspark.sql import SparkSession

from pyspark.sql.functions import *
from pyspark.sql import SparkSession
from json import loads
from flask_cors import CORS


# create sparksession

spark = SparkSession \
    .builder \
    .master("spark://sparkmaster:7077")\
    .appName("Sparkend") \
    .config("spark.some.config.option", "some-value") \
    .getOrCreate()

from flask import Flask, jsonify, make_response
HOST = '25.10.13.68'
PORT = 3200
#__name__
app = Flask(__name__)
CORS(app)

## leen los dataset
#df = spark.read.csv('allyears2k.csv', header='true', inferSchema = True)
airoports = spark.read.csv('hdfs://hadoop-master:9000/airlines/airports.csv', header='true', inferSchema = True)
carriers = spark.read.csv('hdfs://hadoop-master:9000/airlines/carriers.csv', header='true', inferSchema = True)
df = spark.read.csv('hdfs://hadoop-master:9000/airlines/allyears2k.csv',header='true', inferSchema = True)

#airoports = spark.read.csv('airports.csv', header='true', inferSchema = True)
#carriers = spark.read.csv('carriers.csv', header='true', inferSchema = True)

# crean las vistas
df.createOrReplaceTempView("allyears")
airoports.createOrReplaceTempView("airports")
carriers.createOrReplaceTempView("carriers")

# GET METHOD
    
airports_list = spark.sql(
    """    
    SELECT df2.iata AS code,df2.airport AS airport FROM airports AS df2 
    where df2.iata != 'NA'
    LIMIT 50
    """).toJSON().map(lambda j: loads(j)).collect()    
    

@app.route('/airports')
def get_airport_list():
    return make_response(jsonify(airports_list))   

    
first_query = spark.sql(
            """    
    SELECT Origen AS origin, airports.airport AS dest, Retrasos AS count FROM (SELECT df2.airport AS Origen,df.Dest AS Destino,count(df.ArrDelay) AS Retrasos 
    from allyears AS df JOIN airports AS df2 ON df.Origin==df2.iata
    where df.ArrDelay != 'NA'
    group by Origen,Destino) JOIN airports ON Destino == airports.iata
    order by Retrasos desc
    """).toJSON().map(lambda j: loads(j)).collect()

@app.route('/consulta1')
def consulta1():
    
    return make_response(jsonify(first_query))


second_query = spark.sql(
    """    
    SELECT Origen AS origin, airports.airport AS dest, Retrasos AS count FROM (SELECT df2.airport AS Origen,df.Dest AS Destino,count(df.DepDelay) AS Retrasos 
    from allyears AS df JOIN airports AS df2 ON df.Origin==df2.iata
    where df.DepDelay != 'NA'
    group by Origen,Destino) JOIN airports ON Destino == airports.iata
    order by count desc
    """).toJSON().map(lambda j: loads(j)).collect()
    
@app.route('/consulta2')
def consulta2():

    return make_response(jsonify(second_query))
    
    
    
@app.route('/consulta3/<origen>/<destino>')
def consulta3(origen,destino):
    query_string_Ll = "SELECT count(ArrDelay) As count FROM allyears WHERE (ArrDelay != 'NA' AND Origin=='%s' AND Dest=='%s')" % (origen,destino)
    query_string_Sal = "SELECT count(DepDelay) As count FROM allyears WHERE (DepDelay != 'NA' AND Origin=='%s' AND Dest=='%s')" % (origen,destino)
    third_queryLl = spark.sql(query_string_Ll).first()["count"]
    third_querySal = spark.sql(query_string_Sal).first()["count"]
    result = {"countLl":third_queryLl,"countSal":third_querySal}
    return make_response(jsonify([result]))


fourth_query = spark.sql(
    """    
    SELECT CONCAT_WS(" ",SENTENCES(df2.Description)[0]) AS aerolinea, COUNT(df.DepDelay) AS count
    FROM allyears AS df JOIN carriers AS df2
    ON df.UniqueCarrier == df2.Code
    WHERE df.DepDelay != 'NA'
    group by aerolinea
    order by count desc
    """).toJSON().map(lambda j: loads(j)).collect()


@app.route('/consulta4')
def consulta4():
    return make_response(jsonify(fourth_query))
    
    

fifth_query = spark.sql(
    """    
    SELECT CONCAT_WS(" ",SENTENCES(df2.Description)[0]) AS aerolinea, COUNT(df.ArrDelay) AS count
    FROM allyears AS df JOIN carriers AS df2
    ON df.UniqueCarrier == df2.Code
    WHERE df.ArrDelay != 'NA'
    group by aerolinea
    order by count desc
    """).toJSON().map(lambda j: loads(j)).collect() 
    

@app.route('/consulta5')
def consulta5():
    return make_response(jsonify(fifth_query))
    
sixth_query = spark.sql(
    """    
    SELECT CONCAT_WS(" ",SENTENCES(df2.Description)[0]) AS aerolinea, (COUNT(df.ArrDelay)+COUNT(df.DepDelay)) AS count
    FROM allyears AS df JOIN carriers AS df2
    ON df.UniqueCarrier == df2.Code
    WHERE df.ArrDelay != 'NA'
    group by aerolinea
    order by count desc
    LIMIT 1
    """).toJSON().map(lambda j: loads(j)).collect()
     
@app.route('/consulta6')
def consulta6():
    return make_response(jsonify(sixth_query))


seventh_query = spark.sql(
    """    
    SELECT CONCAT_WS(" ",SENTENCES(df2.Description)[0]) AS aerolinea, (COUNT(df.ArrDelay)+COUNT(df.DepDelay)) AS count
    FROM allyears AS df JOIN carriers AS df2
    ON df.UniqueCarrier == df2.Code
    WHERE df.ArrDelay != 'NA'
    group by aerolinea
    order by count asc
    LIMIT 1
    """).toJSON().map(lambda j: loads(j)).collect()


@app.route('/consulta7')
def consulta7():
    return make_response(jsonify(seventh_query))


eigth_query = spark.sql(
    """   
    SELECT Aerolinea AS aerolinea, Origen AS origin, airports.airport AS dest, Retrasos AS count FROM(
    SELECT Aerolinea, airports.airport AS Origen, Destino, Retrasos FROM (SELECT CONCAT_WS(" ",SENTENCES(df2.Description)[0]) AS Aerolinea,df.Origin AS Origen,df.Dest AS Destino,COUNT(df.DepDelay) AS Retrasos
    FROM allyears AS df JOIN carriers AS df2
    ON df.UniqueCarrier == df2.Code
    WHERE df.DepDelay != 'NA' AND df.WeatherDelay!='NA' AND df.CarrierDelay!='NA'
    group by aerolinea,origin,dest,df.DepDelay) 
    JOIN airports ON Origen == airports.iata) 
    JOIN airports ON Destino == airports.iata
    order by count desc
    """).toJSON().map(lambda j: loads(j)).collect()


@app.route('/consulta8')
def consulta8():  
    return make_response(jsonify(eigth_query))


ningth_query = spark.sql(
    """   
    SELECT Aerolinea AS aerolinea, Origen AS origin, airports.airport AS dest, Retrasos AS count FROM(
    SELECT Aerolinea, airports.airport AS Origen, Destino, Retrasos FROM (
    SELECT CONCAT_WS(" ",SENTENCES(df2.Description)[0]) AS Aerolinea,df.Origin AS Origen,df.Dest AS Destino,COUNT(df.ArrDelay) AS Retrasos
    FROM allyears AS df JOIN carriers AS df2
    ON df.UniqueCarrier == df2.Code
    WHERE df.ArrDelay != 'NA' AND df.WeatherDelay!='NA' AND df.CarrierDelay!='NA'
    group by aerolinea,origin,dest,df.ArrDelay) 
    JOIN airports ON Origen == airports.iata) 
    JOIN airports ON Destino == airports.iata
    order by count desc
    """).toJSON().map(lambda j: loads(j)).collect()
    
@app.route('/consulta9')
def consulta9():
    return make_response(jsonify(ningth_query))

tenth_query = spark.sql(
    """   
    SELECT Year AS Time, COUNT(Year) AS count FROM allyears
    WHERE Cancelled = 0
    GROUP BY Year
    ORDER BY Year ASC
    """).toJSON().map(lambda j: loads(j)).collect()


@app.route('/consulta10')
def consulta10():
    return make_response(jsonify(tenth_query))


eleventh_query = spark.sql(
    """   
    SELECT Year AS time, COUNT(Year) AS count FROM allyears
    WHERE Cancelled = 1
    GROUP BY Year
    ORDER BY time ASC
    """).toJSON().map(lambda j: loads(j)).collect()

@app.route('/consulta11')
def consulta11():
    return make_response(jsonify(eleventh_query))


twelfth_query = spark.sql(
    """   
    SELECT CancellationCode AS category, COUNT(CancellationCode) AS count FROM allyears
    WHERE Cancelled = 1
    GROUP BY CancellationCode
    ORDER BY CancellationCode DESC
    """)

twelfth_query = twelfth_query.replace({'NA': 'No Definido','A':"Aerolinea","B":"Clima","C":"Servicios de aviación nacional","D":"Seguridad"},None,["category"])

twelfth_query = twelfth_query.toJSON().map(lambda j: loads(j)).collect()


@app.route('/consulta12')
def consulta12():
    return make_response(jsonify(twelfth_query))



thirth_query = spark.sql(
    """
    SELECT df2.lat AS lat, df2.long AS long, COUNT(df.Origin) AS count
    FROM allyears AS df JOIN airports AS df2
    ON df.Origin == df2.iata
    WHERE df.Cancelled = 0
    GROUP BY df2.lat,df2.long
    ORDER BY count DESC
    """).toJSON().map(lambda j: loads(j)).collect()


@app.route('/consulta13')
def consulta13():
    return make_response(jsonify(thirth_query))


fourteenth_query = spark.sql(
    """
    SELECT df2.lat AS lat, df2.long AS long, COUNT(df.Dest) AS count
    FROM allyears AS df JOIN airports AS df2
    ON df.Dest == df2.iata
    WHERE df.Cancelled = 0
    GROUP BY df2.lat,df2.long
    ORDER BY count DESC
    """).toJSON().map(lambda j: loads(j)).collect()

@app.route('/consulta14')
def consulta14():
    return make_response(jsonify(fourteenth_query))

@app.route('/consulta15/<origen>')
def consulta15(origen):
    query_string = """
    SELECT Year AS agno, COUNT(Year) As count FROM allyears 
    WHERE (Cancelled == 0 AND Origin=='%s')
    GROUP BY Year
    ORDER BY agno
    """ % (origen)
    fifteenth_query = spark.sql(query_string).toJSON().map(lambda j: loads(j)).collect()
    return make_response(jsonify(fifteenth_query))

@app.route('/consulta16/<destino>')
def consulta16(destino):
    query_string = """
    SELECT Year AS agno, COUNT(Year) As count FROM allyears 
    WHERE (Cancelled == 0 AND Dest=='%s')
    GROUP BY Year
    ORDER BY agno
    """ % (destino)
    sixteenth_query = spark.sql(query_string).toJSON().map(lambda j: loads(j)).collect()
    return make_response(jsonify(sixteenth_query))

if __name__ == "__main__":
    app.run(host=HOST, port=PORT)
