BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "clients" (
	"id"	STRING NOT NULL,
	"name"	STRING NOT NULL,
	"email"	STRING,
	"empresa"	STRING,
	"username"	STRING NOT NULL,
	"password"	STRING NOT NULL,
	"status"	STRING,
	"tags"	MULTISELECT,
	PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "products" (
	"id"	STRING NOT NULL,
	"name"	STRING undefined NOT NULL,
	"desc"	STRING undefined,
	PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "reports" (
	"id"	STRING NOT NULL,
	"year"	STRING undefined NOT NULL,
	"month"	STRING undefined NOT NULL,
	"name"	STRING undefined NOT NULL,
	"desc"	STRING undefined,
	"file"	STRING undefined,
	"tag"	STRING undefined NOT NULL,
	PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "userroles" (
	"id"	STRING,
	"name"	STRING undefined,
	PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "users" (
	"id"	STRING,
	"name"	STRING NOT NULL,
	"email"	STRING NOT NULL,
	"username"	STRING NOT NULL,
	"password"	STRING NOT NULL,
	"status"	STRING NOT NULL,
	PRIMARY KEY("id")
);
INSERT INTO "clients" ("id","name","email","empresa","username","password","status","tags") VALUES ('Cm3Vp','Maria clara','magawebtec+maria@gmail.com','Vanguarda Petroleira BR','maria',12345,NULL,'BFDo9,DrSL7,MsJHB,T8VNy,35FEN,EOy9B,f6XXz,fzuSO,70b4l,sdLko');
INSERT INTO "clients" ("id","name","email","empresa","username","password","status","tags") VALUES ('Y7WGM','fidelis silva','magawebtec+fidelis@gmail.com','New plastic do Brasil','fidelis',12345,NULL,'BFDo9,DrSL7,MsJHB,EOy9B,sdLko');
INSERT INTO "products" ("id","name","desc") VALUES ('BFDo9','CAPA',NULL);
INSERT INTO "products" ("id","name","desc") VALUES ('DrSL7','MACRO&MATERIAPRIMA',NULL);
INSERT INTO "products" ("id","name","desc") VALUES ('MsJHB','COMENTÁRIOS',NULL);
INSERT INTO "products" ("id","name","desc") VALUES ('T8VNy','POLIETILENO',NULL);
INSERT INTO "products" ("id","name","desc") VALUES ('35FEN','POLIPROPILENO',NULL);
INSERT INTO "products" ("id","name","desc") VALUES ('EOy9B','PVC',NULL);
INSERT INTO "products" ("id","name","desc") VALUES ('f6XXz','PET',NULL);
INSERT INTO "products" ("id","name","desc") VALUES ('fzuSO','POLIESTIRENO',NULL);
INSERT INTO "products" ("id","name","desc") VALUES ('70b4l','PLÁSTICOSENG',NULL);
INSERT INTO "products" ("id","name","desc") VALUES ('sdLko','FINAL',NULL);
INSERT INTO "reports" ("id","year","month","name","desc","file","tag") VALUES ('PQZOa',2024,1,'CAPA',NULL,'202403_01_CAPA.pdf','BFDo9');
INSERT INTO "reports" ("id","year","month","name","desc","file","tag") VALUES ('6Ovet',2024,1,'MACRO&MATERIAPRIMA',NULL,'202403_02_MARCOeMATERIAPRIMA.pdf','DrSL7');
INSERT INTO "reports" ("id","year","month","name","desc","file","tag") VALUES ('CrIHh',2024,1,'COMENTÁRIOS',NULL,'202403_03_COMENTARIOS.pdf','MsJHB');
INSERT INTO "reports" ("id","year","month","name","desc","file","tag") VALUES ('3WcWy',2024,1,'POLIETILENO',NULL,'202403_04_POLIETILENO-PE.pdf','T8VNy');
INSERT INTO "reports" ("id","year","month","name","desc","file","tag") VALUES ('y41Wo',2024,1,'POLIPROPILENO',NULL,'202403_05_POLIPROPILENO-PP.pdf','35FEN');
INSERT INTO "reports" ("id","year","month","name","desc","file","tag") VALUES ('ZzQyu',2024,1,'PVC',NULL,'202403_06_PVC.pdf','EOy9B');
INSERT INTO "reports" ("id","year","month","name","desc","file","tag") VALUES ('KkGX9',2024,1,'PET',NULL,'202403_07_PET.pdf','f6XXz');
INSERT INTO "reports" ("id","year","month","name","desc","file","tag") VALUES ('5rn4E',2024,1,'POLIESTIRENO',NULL,'202403_08_PS.pdf','fzuSO');
INSERT INTO "reports" ("id","year","month","name","desc","file","tag") VALUES ('xH7vs',2024,1,'PLÁSTICOENG',NULL,'202403_09_PLASTICOSENG.pdf','70b4l');
INSERT INTO "reports" ("id","year","month","name","desc","file","tag") VALUES ('wLfxC',2024,1,'FINAL',NULL,'202403_10_FINAL.pdf','sdLko');
INSERT INTO "reports" ("id","year","month","name","desc","file","tag") VALUES ('NsjZx',2024,2,'ff','d','rel1.pdf','BFDo9');
INSERT INTO "reports" ("id","year","month","name","desc","file","tag") VALUES ('1UOz6',2024,2,'dd',NULL,'rel2.pdf','DrSL7');
INSERT INTO "reports" ("id","year","month","name","desc","file","tag") VALUES ('L3nGb',2024,2,'kk','kk','rel3.pdf','MsJHB');
INSERT INTO "userroles" ("id","name") VALUES ('root','Root');
INSERT INTO "userroles" ("id","name") VALUES ('level1','Nivel 1');
INSERT INTO "userroles" ("id","name") VALUES ('level2','Level 2');
INSERT INTO "userroles" ("id","name") VALUES ('level3','LEVEL 3');
INSERT INTO "users" ("id","name","email","username","password","status") VALUES (1,'marcelo','ddd@ddd.com','adm',12345,'root');
INSERT INTO "users" ("id","name","email","username","password","status") VALUES ('tLGyM','killote','sss@ddd.com','sss@dd.com',111,'level2');
COMMIT;
